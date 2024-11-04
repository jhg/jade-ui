/**
 * @license
 * Copyright 2024
 * SPDX-License-Identifier: Unlicense
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { theme } from '@shared/utils';


@customElement('task-item')
export class TaskItem extends LitElement {
    @property()
    title: string = '';
    @property()
    readonly: boolean = false;
    @property()
    completed: boolean = false;

    static styles = [
        theme,
        css`
            :host {
                display: block;
                background-color: var(--background-color-primary);
                border-color: var(--border-color-primary);
                border-width: 1px;
                border-style: solid;
                border-radius: var(--component-radius);
                padding: 0.5em;
                overflow: hidden;
                height: 1.25em;
            }

            :host * {
                margin: 0;
                padding: 0;
            }

            :host label {
                width: 100%;
            }

            :host input[type=checkbox] {
                width: 1em;
                height: 1em;
                cursor: pointer;
                background-color: rgba(var(--component-primary), 0.1);
                border-color: var(--border-color-primary);
                border-width: 1px;
                border-style: solid;
                border-radius: var(--component-radius);
                appearance: none;
                vertical-align: -15%;
                font-size: 1em;
                color: rgb(var(--component-primary));
                top: 0.15em;
                position: relative;
            }

            :host input[type=checkbox]::before {
                top: -0.3em;
                position: relative;
                content: '✔';
                color: transparent;
            }

            :host input[type=checkbox]:checked {
                background-color: transparent;
            }

            :host input[type=checkbox]:checked::before {
                color: rgb(var(--component-primary));
            }

            :host input[type=text] {
                width: calc(100% - 2em);
                border: none;
                background-color: transparent;
                margin-left: 0.3em;
            }
        `
    ];

    render() {
        return html`
        <label class="list-item ${this.completed ? 'completed' : ''}" aria-label="${this.title}">
            <input type="checkbox" ?checked=${this.completed} @change=${this.toggleCompleted} />
            <input type="text" value="${this.title}" ?readonly=${this.readonly} name="task-item-title" @input=${this.changeName} />
        </label>
        `;
    }

    changeName(event: Event) {
        const input = event.target as HTMLInputElement;
        this.title = input.value;
    }

    toggleCompleted(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        this.completed = checkbox.checked;
    }
}
