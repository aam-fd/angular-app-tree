import { IFile } from "./file";

export interface IFolder {
  name: string,
  type: string,
  children?: Array<IFolder | IFile>
}