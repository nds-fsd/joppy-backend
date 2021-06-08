const { Chat, User } = require("../mongo/index");
const server = require("../index");

exports.index = (req, res) => {
  Chat.find({ users: req.user.id })
    .populate("users", "name")
    .then((chats) => {
      res.status(200).json(chats);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
};

exports.getOne = (req, res) => {
  Chat.findById(req.params.id)
    .populate("users", "name")
    .then((chat) => {
      res.status(200).json(chat);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
};

exports.findByUsers = (req, res) => {
  const userArray = req.body.chatMembers;
  Chat.find({ users: { $all: [...userArray, req.user.id] } })
    .populate("users", "name")
    .then((chat) => {
      res.status(200).json(chat);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
};

exports.createOne = (req, res) => {
  const authUser = req.user;
  const newChatMembers = req.body.chatMembers;

  if (
    newChatMembers === undefined ||
    !newChatMembers instanceof Array ||
    newChatMembers.length === 0
  ) {
    res.status(500).json({ error: "A chat needs members" });
  } else {
    const noDuplicatedMembers = newChatMembers.reduce(
      (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
      []
    );
    const chat = new Chat({ users: [...noDuplicatedMembers, authUser.id] });
    chat
      .save()
      .then((newChat) => {
        User.find({
          _id: { $in: newChat.users },
        }).then((users) => {
          newChat.users = users;
          users
            .filter((u) => u._id !== req.user.id)
            .forEach((user) => {
              server.io.to(`user-${user._id}`).emit("new-chat", newChat);
            });
          res.status(201).json(newChat);
        });
      })
      .catch((e) => {
        res.status(500).json({ error: e.message });
      });
  }
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Chat.findByIdAndDelete(id)
    .then((chat) => {
      res.status(204).json({ message: `chat ${chat} deleted` });
    })
    .catch((error) => {
      res.status(500).json({ error: e.message });
    });
};
