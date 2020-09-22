import React from 'react'
import {EuiCallOut, EuiLink} from '@elastic/eui';

export default function Callout({title, color, handleClick, para, linkText}) {
  return (
    <EuiCallOut title={title} color={color} iconType="user">
        <p>
          {para}{' '}
          <EuiLink onClick={handleClick}>{linkText}</EuiLink>
        </p>
    </EuiCallOut>
  )
}
