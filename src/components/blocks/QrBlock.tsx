import {FC} from "react";

interface IProps{
    img?: string;
    type?: string;
    content?: string;
    qr?:string;
}

const QrBlock :FC<IProps> = ({img,type,content,qr}) => {
    return(
        <div className={"flex flex-col p-[30px] bg-[#F9F8FD] gap-[30px] w-[307px]  rounded-[30px] max-sm:p-[20px] max-sm:gap-0 max-sm:h-auto vr:h-auto vr:w-full vr:gap-[10px]"}>
            <div className={"flex justify-between "}>
                <div className={"text-2xl font-bold leading-[80%] max-sm:text-lg vr:text-[40px]"}>
                    {type}
                </div>
                <img src={img} alt="" className={"w-[36px] h-[36px] vr:w-[95px] vr:h-[95px]"}/>
            </div>
            <img src={qr} alt="" className={"w-[140px] h-[140px]  max-sm:hidden vr:w-[200px] vr:h-[200px]"}/>
            <div className={"text-2xl leading-[80%] text-[#524FA2] max-sm:text-[14px] vr:text-[30px]"}>
                {type !== "Facebook" ? content?.split("/").slice(-2) : ""}
            </div>
        </div>
    )
}

export default QrBlock;