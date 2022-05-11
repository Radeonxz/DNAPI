import { ApplicationModel } from "../models/models.ts";

const createApplication = async (applicationObj: any) => {
  const applicationId = crypto.randomUUID();
  const createdAt = new Date();
  await ApplicationModel.insertOne({
    ...applicationObj,
    applicationId,
    createdAt
  });
  return applicationId;
};

const updateApplicationById = async (
  applicationId: string,
  applicationObj: any
) => {
  const updatedAt = new Date();
  const updatedUser = await ApplicationModel.updateOne(
    { applicationId },
    { $set: { ...applicationObj, updatedAt } }
  );
  return updatedUser;
};

const getAllApplications = async () => {
  const applications = await ApplicationModel.find().toArray();
  return applications;
};

const findApplicationById = async (applicationId: string) => {
  const application = await ApplicationModel.findOne({ applicationId });
  return application;
};

const deleteApplicationById = async (applicationId: string) => {
  const deleteCount = await ApplicationModel.deleteOne({ applicationId });
  return deleteCount;
};

export {
  createApplication,
  updateApplicationById,
  getAllApplications,
  findApplicationById,
  deleteApplicationById
};
