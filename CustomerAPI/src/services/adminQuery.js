const { array } = require("joi");

//pagination
exports.getUsers = async (db, pageOptions, sort, filter = {}) => {
  const { page = 0, limit = 10 } = pageOptions;
  const email = filter.email;
  console.log(page, limit, email);

  let query = {};
  try {
    if (email) {
      query.email = { $regex: new RegExp(email, "i") };
    }

    // let users = await db.collection("users").find().toArray();
    // skip(page * limit).limit(limit);

    let users = await db
      .collection("users")
      .find()
      .skip(page * limit)
      .limit(limit)
      .toArray();

    const totalCount = await db.collection("users").countDocuments();
    return {
      totalCount,
      data: users,
      page,
      limit,
    };
  } catch (error) {
    console.log(error);
  }
};

//filtering
//sorting

exports.searchUsers = async (db,{page,limit}, filter,sort) => {
    page = parseInt(page)
    limit = parseInt(limit)
  console.log(page, limit, filter);

  let query = {email: {$regex: new RegExp(filter)}};

    try {
        const responseData = await db.collection("users").find(query).limit(limit).skip(page*limit).sort(sort).toArray();

    return {
      data: responseData,
      page, 
      limit,
    };
  } catch (error) {
    throw error;
  }
};
