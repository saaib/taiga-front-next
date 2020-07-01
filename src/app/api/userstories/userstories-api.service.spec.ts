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
    const filter = {
      project: faker.random.number(),
    };

    spectator.service.list(filter).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories`, HttpMethod.POST);
  });
});
