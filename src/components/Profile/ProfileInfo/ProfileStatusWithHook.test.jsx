import React from 'react';
import { create, act } from 'react-test-renderer';
import ProfileStatusWithHook from './ProfileStatusWithHook';

describe("ProfileStatusWithHook component", () => {
    test("status from props should be in the state", () => {
        let component;
        act(()=>{
            component = create(<ProfileStatusWithHook status="it's test task" />)
        });
        const instance = component.root;
        expect(instance.props.status).toBe("it's test task");
    });

    test("after creation <span> should be displayed", () => {
        let component;
        act(()=>{
            component = create(<ProfileStatusWithHook status="it's test task" />)
        });
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> shouldn't be displayed", () => {
        let component;
        act(()=>{
            component = create(<ProfileStatusWithHook status="it's test task" />)
        });
        const root = component.root;
        expect(root).not.toContain('input');
    });
    test("after creation <span> should contains correct status", () => {
        let component;
        act(()=>{
            component = create(<ProfileStatusWithHook status="it's test task" />)
        });
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("it's test task");
    });

    // test("input should be displayed in editMode instead of span", () => {
    //     let component;
    //     act(()=>{
    //         component = create(<ProfileStatusWithHook status="it's test task" isOwner={true} />)
    //     });
    //     const root = component.root;
    //     // let div = root.findByType("span").parent;
    //     const span = root.findByType("span");
    //     span.click();
    //     let div = root.findByType(".statusInputBlock");

    //     div.click();
    //     let input = root.findByType("input");
    //     expect(input.props.value).toBe("it's test task");
    // });

})