import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import {
  Userstory,
  UserstoryList,
  UserstoryFilter,
  UserstoryCreationData,
  UserStoryFiltersData,
  UserstoryVoter
} from './userstories.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UserstoryWatcher, Attachment, AttachmentCreationData } from './userstories.model';

@Injectable()
export class UserstoriesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/userstories`;
  }

  public list(filter: Partial<UserstoryFilter>) {
    return this.http.get<UserstoryList[]>(this.base, {
      params: UtilsService.buildQueryParams(filter),
    });
  }

  public create(newProject: UserstoryCreationData) {
    return this.http.post<Userstory>(this.base, newProject);
  }

  public get(id: number) {
    return this.http.get<Userstory>(`${this.base}/${id}`);
  }

  public getByRef(project: number, ref: number) {
    return this.http.get<Userstory>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        ref,
      }),
    });
  }

  public put(id: number, us: Partial<Userstory>) {
    return this.http.put<Userstory>(`${this.base}/${id}`, us);
  }

  public patch(id: number, us: Partial<Userstory>) {
    return this.http.patch<Userstory>(`${this.base}/${id}`, us);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkCreation(projectId: number, stories: string, statusId?: number) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_create`, {
      project_id: projectId,
      bulk_stories: stories,
      ...(statusId && { status_id: statusId }),
    });
  }

  public bulkUpdateBacklogOrder(projectId: number, bulkStories: {order: number; us_id: number}[]) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_update_backlog_order`, {
      project_id: projectId,
      bulk_stories: bulkStories,
    });
  }

  public bulkUpdateKanbanOrder(projectId: number, bulkStories: {order: number; us_id: number}[]) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_update_kanban_order`, {
      project_id: projectId,
      bulk_stories: bulkStories,
    });
  }

  public bulkUpdateSprintOrder(projectId: number, bulkStories: {order: number; us_id: number}[]) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_update_sprint_order`, {
      project_id: projectId,
      bulk_stories: bulkStories,
    });
  }

  public bulkUpdateMilestone(projectId: number, milestoneId: number, bulkStories: {order: number; us_id: number}[]) {
    return this.http.post(`${this.base}/bulk_update_sprint_order`, {
      project_id: projectId,
      milestone_id: milestoneId,
      bulk_stories: bulkStories,
    });
  }

  public filtersData(project: number) {
    return this.http.get<UserStoryFiltersData>(`${this.base}/filters_data`, {
      params: UtilsService.buildQueryParams({
        project,
      }),
    });
  }

  public upvote(id: number) {
    return this.http.post(`${this.base}/${id}/upvote`, null);
  }

  public downvote(id: number) {
    return this.http.post(`${this.base}/${id}/downvote`, null);
  }

  public voters(id: number) {
    return this.http.get<UserstoryVoter[]>(`${this.base}/${id}/voters`);
  }

  public watch(id: number) {
    return this.http.get(`${this.base}/${id}/watch`);
  }

  public unwatch(id: number) {
    return this.http.get(`${this.base}/${id}/unwatch`);
  }

  public watchers(id: number) {
    return this.http.get<UserstoryWatcher>(`${this.base}/${id}/watchers`);
  }

  public attachments(projectId: number, objectId: number) {
    return this.http.get<Attachment[]>(`${this.base}/attachments`, {
      params: UtilsService.buildQueryParams({
        project: projectId,
        object_id: objectId,
      }),
    });
  }

  public createAttachment(attachment: AttachmentCreationData) {
    const formData = new FormData();
    formData.append('object_id', attachment.object_id.toString());
    formData.append('project', attachment.project.toString());
    formData.append('attached_file', attachment.attached_file, attachment.attached_file.name);

    if (attachment.description) {
      formData.append('description', attachment.description);
    }

    if (attachment.is_deprecated) {
      formData.append('is_deprecated', attachment.is_deprecated.toString());
    }

    return this.http.post<Attachment>(`${this.base}/attachments`, formData);
  }

  public getAttachment(attachmentId: number) {
    return this.http.get<Attachment>(`${this.base}/attachments/${attachmentId}`);
  }

  public putAttachment(id: number, attachment: Partial<AttachmentCreationData>) {
    const formData = new FormData();

    if (attachment.object_id) {
      formData.append('object_id', attachment.object_id.toString());
    }

    if (attachment.project) {
      formData.append('project', attachment.project.toString());
    }

    if (attachment.attached_file) {
      formData.append('attached_file', attachment.attached_file, attachment.attached_file.name);
    }

    if (attachment.description) {
      formData.append('description', attachment.description);
    }

    if (attachment.is_deprecated) {
      formData.append('is_deprecated', attachment.is_deprecated.toString());
    }

    return this.http.put<Attachment>(`${this.base}/attachments${id}`, formData);
  }

  public patchAttachment(id: number, attachment: Partial<AttachmentCreationData>) {
    const formData = new FormData();

    if (attachment.object_id) {
      formData.append('object_id', attachment.object_id.toString());
    }

    if (attachment.project) {
      formData.append('project', attachment.project.toString());
    }

    if (attachment.attached_file) {
      formData.append('attached_file', attachment.attached_file, attachment.attached_file.name);
    }

    if (attachment.description) {
      formData.append('description', attachment.description);
    }

    if (attachment.is_deprecated) {
      formData.append('is_deprecated', attachment.is_deprecated.toString());
    }

    return this.http.put<Attachment>(`${this.base}/attachments${id}`, formData);
  }

  public deleteAttachment(attachmentId: number) {
    return this.http.delete(`${this.base}/attachments/${attachmentId}`);
  }
}
