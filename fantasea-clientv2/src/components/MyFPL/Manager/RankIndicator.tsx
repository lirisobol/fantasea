import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons/faCaretUp";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
interface RankIndicatorProps {
    current_rank: number;
    previous_rank: number;
}
export const RankIndicator = ({current_rank, previous_rank}:RankIndicatorProps):JSX.Element => {
    return (
        <>
            {current_rank > previous_rank && (
                <span>
                    <FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginRight:"10px"}} size="lg"/>
                    {current_rank}
                </span>
            )}
            {current_rank < previous_rank && (
                <span>
                    <FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginRight:"10px"}} size="lg"/>
                    {current_rank}
                </span>
            )}
            {current_rank === previous_rank && (
                <span className="ml-5">
                    {current_rank}
                </span>
            )}
        </>        
    )
}

/* 

<FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginRight:"10px"}} size="lg"/>
<FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginRight:"10px"}} size="lg"/>


*/