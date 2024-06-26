import { FC } from "react";

interface IProps {
    img?: string;
    type?: string;
    content?: string;
}

const ContactBlock: FC<IProps> = ({ img, type, content }) => {
    return (
        <div className={"flex p-[30px] bg-[#F8F8FB] gap-[25px] items-center w-[520px] rounded-[30px]" +
            " max-sm:w-full max-sm:h-auto max-sm:gap-[10px] max-sm:p-[20px] vr:w-full vr:h-auto"}>
            <img src={img} className="w-[60px] max-h-[60px] max-sm:w-[40px] max-sm:max-h-[40px] vr:w-[120px] vr:max-h-[120px] " alt={""} />
            <div className={"flex flex-col gap-[10px] "}>
                <div className={"text-[20px] leading-[80%] tracking-[-0.8px] text-[#211F23] max-sm:text-[14px] vr:text-[30px]"}>
                    {type}
                </div>
                <div className={"text-[24px] font-bold max-sm:text-[14px] text-ellipsis overflow-hidden w-full vr:text-[40px]"} style={{
                    color: type !== "Приемная:" ? "#524FA2" : "#211F23",
                }}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default ContactBlock;
