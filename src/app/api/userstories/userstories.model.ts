import { User } from '@/app/api/users/users.model';
import { Optional } from 'utility-types';

export interface UserstoryFilter {
  project: number;
  milestone: number;
  milestone__isnull: boolean;
  status: number;
  status__is_archived: boolean;
  tags: string;
  watchers: number[];
  assigned_to: number[];
  epic: number;
  role: number;
  status__is_closed: boolean;
  exclude_status: number;
  exclude_tags: string;
  exclude_assigned_to: number;
  exclude_role: number;
  exclude_epic: number;
}

export interface Userstory {
  assignedTo: null | number;
  assignedToExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  assignedUsers: number[];
  attachments: unknown[];
  backlogOrder: number;
  blockedNote: string;
  blockedNoteHtml: string;
  clientRequirement: boolean;
  comment: string;
  createdDate: string;
  description: string;
  descriptionHtml: string;
  dueDate: null | string;
  dueDateReason: string;
  dueDateStatus: string;
  epicOrder: null | number;
  epics: null | {
    color: string;
    id: number;
    project: {
        id: number;
        name: string;
        slug: string;
    };
    ref: number;
    subject: string;
  }[];
  externalReference: null | number;
  finishDate: null | string;
  generatedFromIssue: null | boolean;
  generatedFromTask: null | boolean;
  id: number;
  isBlocked: boolean;
  isClosed: boolean;
  isVoter: boolean;
  isWatcher: boolean;
  kanbanOrder: number;
  milestone: null | number;
  milestoneName: null | string;
  milestoneSlug: null | string;
  modifiedDate: string;
  neighbors: {
    next: Pick<Userstory, 'id' | 'ref' | 'subject'>
    previous: Pick<Userstory, 'id' | 'ref' | 'subject'>
  };
  originIssue: null | number;
  originTask: null | number;
  owner: number;
  ownerExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  points: Record<string, number>;
  project: number;
  projectExtraInfo: {
      id: number;
      logoSmallUrl: null | string;
      name: string;
      slug: string;
  };
  ref: number;
  sprintOrder: number;
  status: number;
  statusExtraInfo: {
      color: string;
      isClosed: boolean;
      name: string;
  };
  subject: string;
  tags: [string, string | null][];
  tasks: number[];
  teamRequirement: boolean;
  totalAttachments: number;
  totalComments: number;
  totalPoints: number;
  totalVoters: number;
  totalWatchers: number;
  tribeGig: null | string;
  version: number;
  watchers: number[];
}

export type UserstoryCreationData = Pick<Userstory,
  'assignedTo' |
  'backlogOrder' |
  'blockedNote' |
  'clientRequirement' |
  'description' |
  'isBlocked' |
  'isClosed' |
  'kanbanOrder' |
  'milestone' |
  'points' |
  'project' |
  'sprintOrder' |
  'status' |
  'subject' |
  'tags' |
  'teamRequirement' |
  'watchers'>;

export type UserstoryList  = Omit<Userstory,
  'blockedNoteHtml' |
  'description' |
  'descriptionHtml' |
  'neighbors'>;

export interface UserStoryFiltersData {
  assignedTo: {
    count: number;
    fullName: string;
    id: null | number;
  }[];
  assignedUsers: {
    count: number;
    fullName: string;
    id: null | number;
  }[];
  epics: {
    count: number;
    id: null | number,
    order: number,
    ref: null | number,
    subject: null | string
  }[];
  owners: {
    count: number;
    fullName: string;
    id: number;
  }[];
  roles: {
    color: null | string;
    count: number;
    id: number;
    name: string;
    order: number;
  }[];
  statuses: {
    color: string;
    count: number;
    id: number;
    name: string;
    order: number;
  }[];
  tags: {
    color: null | string;
    count: number;
    name: string;
  }[];
}

export type UserstoryVoter = Pick<User, 'fullName' | 'id' | 'username'>;
export type UserstoryWatcher = Pick<User, 'fullName' | 'id' | 'username'>;

export interface Attachment {
  attachedFile: string;
  createdDate: string;
  description: string;
  fromComment: boolean;
  id: number;
  isDeprecated: boolean;
  modified_date: string;
  name: string;
  objectId: number;
  order: number;
  owner: number;
  previewUrl: string;
  project: number;
  sha1: string;
  size: number;
  thumbnailCardUrl: null | string;
  url: string;
}

export type AttachmentCreationData = Optional<{
  attachedFile: File;
} & Pick<Attachment,
  'objectId' |
  'project' |
  'description' |
  'isDeprecated'>,
  'description' |
  'isDeprecated'>;
