import React from 'react'
import {EuiLoadingChart} from '@elastic/eui';

export default function PageLoader() {
  return (
    <div className="page-container single">
        <EuiLoadingChart size="xl" />
    </div>
  )
}
