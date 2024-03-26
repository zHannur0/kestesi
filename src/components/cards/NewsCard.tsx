import {IKruzhok, News} from "@/types/assets.type";
import {FC} from "react";


interface IProps {
    item: News;
}

const NewsCard: FC<IProps> = ({item}) =>{
    return(
        <div className={"w-[1720px] min-h-[320px] bg-white flex rounded-[20px]"}>
            <div className={"rounded-tl-[20px] rounded-bl-[20px]"} style={{backgroundImage: `url(${item.img1})`, width: "560px", backgroundSize: "cover"}}>
            </div>
            <div className={"flex w-[1160px] flex-col gap-[20px] py-[20px] pl-[23px] px-[35px]"}>
                <div className={"text-[24px] font-bold text-[#524FA2]"}>
                    {item.text?.split(" ")[0] + " " + item.text?.split(" ")[1] + " " + item.text?.split(" ")[2] + "..."}
                </div>
                <div className={"text-2xl font-normal leading-[143.333%]"}>
                    {item.text}
                </div>
                <div className={"text-[20px] text-[#7B7984]"}>
                    {item.date}
                </div>

            </div>
        </div>
    )
}


export default NewsCard;