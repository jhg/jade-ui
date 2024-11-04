import type { Meta, StoryObj } from '@storybook/web-components';
//import { fn } from '@storybook/test';

import "@components/task-item";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta = {
    title: 'Example/TaskItem',
    tags: ['autodocs'],
    component: 'task-item',
};

export default meta;
type Story = StoryObj;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        title: 'A simple task',
        readonly: false,
        completed: false,
    },
};

export const Completed: Story = {
    args: {
        ...Default.args,
        completed: true,
    },
};

export const ReadOnly: Story = {
    args: {
        ...Default.args,
        readonly: true,
    },
};

export const CompletedReadOnly: Story = {
    args: {
        ...Default.args,
        readonly: true,
        completed: true,
    },
};
