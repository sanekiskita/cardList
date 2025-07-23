import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ThePagination from '../ThePagination.vue'

describe('ThePagination', () => {
  window.innerWidth = 1280;

  it('zero page', () => {
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 0, modelValue: 0 }
        }
    )
    expect(wrapper.text()).toContain('1');
  });

  it('one page', () => {
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 1, modelValue: 1 }
        }
    )
    expect(wrapper.text()).toContain('1');
  });

  it('arrow only right step', () => {
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 2, modelValue: 1 }
        }
    )
    expect(wrapper.text()).toContain('123>>>');
  });

  it('arrow only left step', () => {
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 3, modelValue: 3 }
        }
    )
    expect(wrapper.text()).toContain('<<<123');
  });

  it('arrow one step', () => {
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 3, modelValue: 2 }
        }
    )
    expect(wrapper.text()).toContain('<123>');
  });

  it('arrow first|last', () => {
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 6, modelValue: 3 }
        }
    )
    expect(wrapper.text()).toContain('<<<123456>>>');
  });

  it('mobile S', () => {
    window.innerWidth = 600;
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 6, modelValue: 3 }
        }
    )
    expect(wrapper.text()).toContain('<<<234>>>');
  });

  it('mobile Xs', () => {
    window.innerWidth = 400;
    const wrapper = mount(
        ThePagination,
        {
            props: { maxPage: 6, modelValue: 3 }
        }
    )
    expect(wrapper.text()).toContain('<<<3>>>');
  });
})
