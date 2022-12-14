## admin template server

#### åè½æ¸å ð

- ç»å½æ³¨å
- ç¨æ·ç®¡ç
- è§è²ç®¡ç
- jwtéªè¯
- èåç®¡ç
- ...

#### æ°æ®åºè®¾è®¡
- ç¨æ·æ¨¡å

```javascript
/**
 * ç¨æ·æ¨¡å
 * @author yupi
 */
const UserModel = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        roleId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        createTime: {
            type: DataTypes.DATE,
        },
        updateTime: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "user",
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    });
```

- è§è²æ¨¡å

```javascript
/**
 * è§è²æ¨¡å
 * @author yupi
 */
const RoleModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    // Model attributes are defined here
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    menuIds: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "user",
    paranoid: true,
    deletedAt: "isDelete",
    timestamps: false,
  }
);
```
    
- èåæ¨¡å

```javascript
const MenuModule = sequelize.define('Menu', 
    {
        id: {
            type: DateType.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        parentId: {
            type: DateType.BIGINT,
            allowNull: false,
        },
        // Model attributes are defined here
        menuName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menuIcon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menuSort: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        menuUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        createTime: {
            type: DataTypes.DATE,
        },
        updateTime: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "menu",
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    })
```

