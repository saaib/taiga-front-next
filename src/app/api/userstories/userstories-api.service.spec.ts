/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { parseQueryParams } from '@/utils/test.helpers';

import { UserstoriesApiService } from './userstories-api.service';
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UserstoryCreationDataMockFactory, UserstoryMockFactory, UserstoryAttachmentCreationMockFactory } from './userstories.model.mock';
import { AttachmentCreationData } from './userstories.model';

describe('UserstoriesApiService', () => {
  let spectator: SpectatorHttp<UserstoriesApiService>;
  const createHttp = createHttpFactory({
    service: UserstoriesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    const filter = {
      project: faker.random.number(),
    };

    spectator.service.list(filter).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories?${UtilsService.buildQueryParams(filter)}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = UserstoryCreationDataMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get userstory', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}`, HttpMethod.GET);
  });

  it('get userstory by ref', () => {
    const ref = faker.random.number();
    const project = faker.random.number();

    spectator.service.getByRef(project, ref).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/?${UtilsService.buildQueryParams({
      project,
      ref,
    })}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = UserstoryMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = UserstoryMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete userstory', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}`, HttpMethod.DELETE);
  });

  it('bulk creation', () => {
    const projectId = faker.random.number();
    const bulkStories = '1,2,3';
    const statusId = faker.random.number();

    spectator.service.bulkCreation(projectId, bulkStories, statusId).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_create`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
      statusId,
    });
  });

  it('bulk update backlog order', () => {
    const projectId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateBacklogOrder(projectId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_backlog_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
    });
  });

  it('bulk update kanban order', () => {
    const projectId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateKanbanOrder(projectId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_kanban_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
    });
  });

  it('bulk update sprint order', () => {
    const projectId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateSprintOrder(projectId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_sprint_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
    });
  });

  it('bulk update milestone order', () => {
    const projectId = faker.random.number();
    const milestoneId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateMilestoneOrder(projectId, milestoneId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_sprint_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      milestoneId,
      bulkStories,
    });
  });

  it('filters data', () => {
    const project = faker.random.number();

    spectator.service.filtersData(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/filters_data/?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('upvote', () => {
    const id = faker.random.number();

    spectator.service.upvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/${id}/userstories/upvote`, HttpMethod.POST);
  });

  it('downvote', () => {
    const id = faker.random.number();

    spectator.service.downvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/${id}/userstories/downvote`, HttpMethod.POST);
  });

  it('voters', () => {
    const id = faker.random.number();

    spectator.service.voters(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/${id}/userstories/voters`, HttpMethod.GET);
  });

  it('watch', () => {
    const id = faker.random.number();

    spectator.service.watch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/${id}/userstories/watch`, HttpMethod.GET);
  });

  it('unwatch', () => {
    const id = faker.random.number();

    spectator.service.unwatch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/${id}/userstories/unwatch`, HttpMethod.GET);
  });

  it('watchers', () => {
    const id = faker.random.number();

    spectator.service.watchers(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/${id}/userstories/watchers`, HttpMethod.GET);
  });

  it('get epic attachments', () => {
    const projectId = faker.random.number();
    const objectId = faker.random.number();

    spectator.service.attachments(projectId, objectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments?${UtilsService.buildQueryParams({
      project: projectId,
      objectId,
    })}`, HttpMethod.GET);
  });

  it('create epic attachment', () => {
    const mockAttachment = UserstoryAttachmentCreationMockFactory.build();

    const formData = new FormData();

    formData.append('objectId', mockAttachment.objectId.toString());
    formData.append('project', mockAttachment.project.toString());
    formData.append('attachedFile', mockAttachment.attachedFile, mockAttachment.attachedFile.name);

    if (mockAttachment.description) {
      formData.append('description', mockAttachment.description);
    }

    if (mockAttachment.isDeprecated) {
      formData.append('isDeprecated', mockAttachment.isDeprecated.toString());
    }

    spectator.service.createAttachment(mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });
});
