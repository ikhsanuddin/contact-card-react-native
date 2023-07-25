import { Svg, Path } from "react-native-svg";

export default function IconBack(prop) {
  return (
    <Svg height="30" viewBox="0 -960 960 960" width="30" {...prop}>
      <Path
        fill={"black"}
        d="m113-480 315 315q11 11 11 27.5T428-109q-12 12-28.5 12T371-109L42-438q-9-9-13-20t-4-22q0-11 4-22t13-20l330-330q12-12 28-11.5t28 12.5q11 12 11.5 28T428-795L113-480Z"
      />
    </Svg>
  );
}
