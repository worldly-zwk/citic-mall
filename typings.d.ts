declare module '*.mp4';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.css';
declare module '*.less';
declare module '*.html';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string;
  export default url;
}
