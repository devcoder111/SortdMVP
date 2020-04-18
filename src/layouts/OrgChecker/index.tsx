import React, {Fragment} from 'react';
import { getOrgDetails } from '@/utils/localStorage';
import {isEmpty} from 'lodash'

export interface OrgCheckProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export function OrgCheck({
  fallback,
  children,
}: OrgCheckProps): JSX.Element {
    const orgDetails = getOrgDetails()
    const hasOrg = orgDetails !== 'undefined' && !isEmpty(orgDetails)

  if (hasOrg) {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
  } else {
    return <>{fallback}</>;
  }
}
