import {FC} from "react";

interface IProps{
    img?: string;
    type?: string;
    content?: string;
    qr?:string;
}

const QrBlock :FC<IProps> = ({img,type,content,qr}) => {
    return(
        <div className={"flex flex-col p-[30px] bg-[#F9F8FD] gap-[30px] w-[307px] h-[300px] rounded-[30px]"}>
            <div className={"flex justify-between"}>
                <div className={"text-2xl font-bold leading-[80%]"}>
                    {type}
                </div>
                <img src={img} alt="" className={"w-[36px] h-[36px]"}/>
            </div>
            <img src={qr} alt=""/>
            <div className={"text-2xl leading-[80%] text-[#524FA2]"}>
                {content}
            </div>
        </div>
    )
}

export default QrBlock;