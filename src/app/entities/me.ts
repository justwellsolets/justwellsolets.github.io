import { IAchievement } from './achievement';
import { ICertificate } from './certificate';
import { IContact } from './contact';
import { IEducation } from './education';
import { IExperience } from './experience';
import { ISkill } from './skill';

export interface IMyDetails {
  me: IMe;
  educations: IEducation[];
  certifications: ICertificate[];
  achievements: IAchievement[];
  experiences: IExperience[];
  skills: ISkill[];
  contact: IContact[];
  highlights: IHighlights[];
}

export interface IMe {
  jobTitle: string;
  description: string;
  firstName: string;
  lastName: string;
  links: ILinks;
  additionalButtons: IAdditionalButton[];
}

export interface ILinks {
  resume: string;
}

export interface IAdditionalButton {
  icon: string;
  link: string;
}

export interface IHighlights {
  value: string;
  label: string;
}
