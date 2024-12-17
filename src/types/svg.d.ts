/// <reference types="vite/client" />
import { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;
interface IconProps extends ElementAttributes {
    size?: string | number;
}
type IconComponent = ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>>;
declare module '*.svg' {
    const ReactComponent: IconComponent;
    export = ReactComponent;
}