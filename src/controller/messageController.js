const { Message, Chat } = require("../mongo/index");
const server = require("../index");
//GET ALL BY CHAT
exports.index = (req, res) => {
  Message.find({ chat: req.params.chatId })
    .populate("user")
    .then((chats) => {
      res.status(200).json(chats);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
};

exports.createOne = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (chat) {
      if (req.body.text) {
        const message = new Message({
          user: req.user.id,
          chat: req.params.chatId,
          text: req.body.text,
        });
        message
          .save()
          .then((newMessage) => {
            Message.populate(newMessage, { path: "user" }, (err, m) => {
              server.io.to(`chat-${m.chat}`).emit("new-message", m);
              chat.users
                .filter((u) => u !== req.user.id)
                .forEach((user) => {
                  server.io.to(`user-${user._id}`).emit("new-chat-message", m);
                });
              res.status(201).json(m);
            });
          })
          .catch((e) => {
            res.status(500).json({ error: e.message });
          });
      }
    } else {
      res.status(500).json({ error: "wrong chat ID" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
