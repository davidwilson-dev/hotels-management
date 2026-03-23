import { StaffProfile } from "#/models/staffProfile.model.js"

const getStaffProfiles = async (limit, skip) => {
  const users = await StaffProfile.find()
    .populate({
      path: "userId",
      select: "-password" 
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return users;
};

const findByUserId = (userId) => {
  return StaffProfile.findOne({ userId }).lean();
};

const createStaffProfile = async (staffProfileData) => {
  const staffProfile = await StaffProfile.create(staffProfileData);

  return staffProfile;
};

const updateByUserId = (userId, payload) => {
  return StaffProfile.findOneAndUpdate(
    { userId },
    { $set: payload },
    {
      returnDocument: "after",
      runValidators: true,
      lean: true
    }
  );
};

const deleteByUserId = (userId) => {
  return StaffProfile.deleteOne({ userId });
};

export const staffProfilesRepo = {
  getStaffProfiles,
  findByUserId,
  createStaffProfile,
  updateByUserId,
  deleteByUserId
}
