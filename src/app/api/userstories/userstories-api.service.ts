import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { Userstory, UserstoryList, UserstoryFilter, UserstoryCreationData, UserStoryFiltersData, UserstoryVoter } from './userstories.model';

@Injectable()
export class UserstoriesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/userstories`;
  }

  public list(filter: Partial<UserstoryFilter>) {
    // todo
    return this.http.get<UserstoryList[]>(`${this.base}/?${new URLSearchParams({
      project: filter.project!.toString(),
    })}`);
  }

  public create(newProject: UserstoryCreationData) {
    return this.http.post<Userstory>(this.base, newProject);
  }

  public get(id: number) {
    return this.http.get<Userstory>(`${this.base}/${id}`);
  }

  public getByRef(project: number, ref: number) {
    return this.http.get<Userstory>(`${this.base}/?${new URLSearchParams({
      project: project.toString(),
      ref: ref.toString(),
    })}`);
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
    return this.http.get<UserStoryFiltersData>(`${this.base}/filters_data?${new URLSearchParams({
      project: project.toString(),
    })}`);
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
}
