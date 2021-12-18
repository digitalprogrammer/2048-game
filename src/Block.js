import { getColors } from "./util"

const Block = ({digit}) =>
{  
  const {blockStyle} = style
    return(
    <div style={{...blockStyle, background:getColors(digit), color:digit === 2 || digit === 4 ? "#645B52" : "#645B88"}}>
        {digit === 0 ? "" : digit}</div>
    )
    
}
const style = {
    blockStyle:
    {
      height: 80,
      width: 80,
      background: "lightgray",
      margin: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 45,
      fontWeight: "800",
      color:"white",
    }
  }
export default Block

