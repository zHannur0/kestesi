import {FC} from "react";

interface IProps{
    img?: string;
    type?: string;
    content?: string;
}

const ContactBlock :FC<IProps> = ({img,type,content}) => {
    return(
        <div className={"flex p-[30px] bg-[#F8F8FB] gap-[25px] items-center w-[520px] h-[140px] rounded-[30px]" +
            " max-sm:w-full max-sm:h-auto max-sm:gap-[10px] max-sm:p-[20px]"}>
            <img src={img} className=" max-sm:w-[60px] max-sm:h-[60px]" alt={""}/>
            <div className={"flex flex-col gap-[10px] "}>
                <div className={"text-[20px]  leading-[80%] tracking-[-0.8px] text-[#211F23] max-sm:text-[14px]"}>
                    {type}
                </div>
                <div className={"text-[24px] font-bold leading-[20px] max-sm:text-[14px]"} style={{
                    color: type !== "Приемная:" ? "#524FA2" : "#211F23"
                }}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default ContactBlock;