type LoadingAppStatus = {
  state: "LOADING";
  error?: never;
};

type SuccessAppStatus = {
  state: "SUCCESS";
  error?: never;
};

type ErrorAppStatus = {
  state: "ERROR";
  error: Error;
};

type WithoutIdType = "LOAD_TODO" | "ADD_TODO";

type WithIdType = "UPDATE_TODO" | "DELETE_TODO";

type WithoutIdTypes = {
  type: WithoutIdType;
  id?: never;
};

type WithIdTypes = {
  type: WithIdType;
  id: number;
};

type BaseAppStatus = LoadingAppStatus | ErrorAppStatus | SuccessAppStatus;

type BaseTypeStatus = WithoutIdTypes | WithIdTypes;

export type AppStatus = BaseAppStatus & BaseTypeStatus;

export type StatusType = WithoutIdType | WithIdType;
