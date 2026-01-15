import vvtContent from "../assets/01. Welcome To The Course!.vtt?raw"
import { parserVTT } from "../util/srtParser.ts";
export default function HomePage() {
  // console.log(vvtContent);
   parserVTT(vvtContent)
  return <h1>{vvtContent}</h1>;

}
