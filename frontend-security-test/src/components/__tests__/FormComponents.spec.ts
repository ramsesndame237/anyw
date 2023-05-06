import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import vuetify from '../../plugins/vuetify';

import FormComponents from '../FormComponents.vue';

describe('FormComponent', () => {
  const wrapper = mount(FormComponents)



  it('test if submit function is passed', async ()=>{
    expect(typeof FormComponents.props.handleSubmit).toBe('function')
  })



  it('renders properly', () => {
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});