import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";
import bcrypt from "bcrypt";
import { signToken, veriifyTocken } from "../utils/token.mjs";
import { AppError } from "../utils/app-error.mjs";

export const UserRole = Object.freeze({
  USER: "user",
  ADMIN: "admin",
});

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue(
          "email",
          String(value ?? "")
            .trim()
            .toLowerCase(),
        );
      },
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          user.passwordChangedAt = new Date();
        }
      },
    },
  },
);

User.prototype.generateToken = function () {
  return signToken(this.id);
};

User.findByToken = async function (token) {
  const payload = veriifyTocken(token);
  const user = await this.findByPk(payload.id);
  
  if (
    user?.passwordChangedAt &&
    payload.iat * 1000 < user.passwordChangedAt.getTime() - 1000
  ) {
    throw new AppError("Passord was changed, please login again", 401);
  }
  return user;
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  delete values.passwordChangedAt;

  return values;
};
