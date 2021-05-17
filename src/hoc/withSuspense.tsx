import React from "react";
import Preloader from '../components/common/Preloader/Preloader';

export const withSuspense = <WSP extends object>(Component: React.ComponentType<WSP>) => {
    return (props: WSP) => {
        return (
            <React.Suspense fallback={<Preloader />}>
                <Component {...props as WSP}/>
            </React.Suspense>
        );
    };
};

