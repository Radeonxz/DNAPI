import { ApplicationModel } from "../models/models.ts";

const createApplication = async (applicationObj: any) => {
  const applicationId = crypto.randomUUID();
  await ApplicationModel.insertOne({ ...applicationObj, applicationId });
  return applicationId;
};

const updateApplicationById = async (
  applicationId: string,
  applicationObj: any
) => {
  const updatedUser = await ApplicationModel.updateOne(
    { applicationId },
    { $set: { ...applicationObj } }
  );
  return updatedUser;
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
  findApplicationById,
  deleteApplicationById
};
