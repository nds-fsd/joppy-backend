/** @format */

const roles = ["DEVELOPER_ROLE", "COMPANY_ROLE", "ADMIN_ROLE"];

exports.developerRoleMiddleware = (req, res, next) => {
	const user = req.body;

	if (!roles.includes(user.role)) {
		throw new Error(`Invalid UserRole: ${user.role}`);
	}

	if (user.role !== "DEVELOPER_ROLE") {
		throw new Error(`You don't have permission for this action.`);
	}
	next();
};

exports.companyRoleMiddleware = (req, res, next) => {
	const user = req.body;

	if (!roles.includes(user.role)) {
		throw new Error(`Invalid UserRole: ${user.role}`);
	}

	if (user.role !== "COMPANY_ROLE") {
		throw new Error(`You don't have permission for this action.`);
	}
	next();
};

exports.adminRoleMiddleware = (req, res, next) => {
	const user = req.body;

	if (!roles.includes(user.role)) {
		throw new Error(`Invalid UserRole: ${user.role}`);
	}

	if (user.role !== "ADMIN_ROLE") {
		throw new Error(`You don't have permission for this action.`);
	}
	next();
};

exports.allRoleMiddleware = (req, res, next) => {
	const user = req.body;
	console.log(user);

	if (!roles.includes(user.role)) {
		throw new Error(`Invalid UserRole: ${user.role}`);
	}
	req.hasPermission = true;
	next();
};
