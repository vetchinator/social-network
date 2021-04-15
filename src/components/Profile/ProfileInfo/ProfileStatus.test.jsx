import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it's test task" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it's test task");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="it's test task" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="it's test task" />);
        const root = component.root;
        expect(()=> {
            let input = root.findByType("input")
        }).toThrow();
    });

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="it's test task" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("it's test task");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="it's test task" />);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("it's test task");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="it's test task" updateUserStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1)
    });


})