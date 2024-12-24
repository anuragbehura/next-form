import React from 'react';
import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';

function FormElementSidebar() {
  return (
    <div>
        Elements
        <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  )
}

export default FormElementSidebar