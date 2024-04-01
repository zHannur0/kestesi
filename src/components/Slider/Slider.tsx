import {FC, useState} from "react";

interface IProps {
    slides: any[];
}

const Slider: FC<IProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className="relative w-[898px] h-[380px] rounded-[40px]">
            {/*<div>*/}
            {/*    <div*/}
            {/*        onClick={goToPrevious}*/}
            {/*        className="absolute top-1/2 -translate-y-1/2 left-8 text-4xl text-white z-10 cursor-pointer"*/}
            {/*    >*/}
            {/*        ❰*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        onClick={goToNext}*/}
            {/*        className="absolute top-1/2 -translate-y-1/2 right-8 text-4xl text-white z-10 cursor-pointer"*/}
            {/*    >*/}
            {/*        ❱*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div
                className="w-full h-full rounded-[40px] bg-cover bg-center"
                style={{ backgroundImage: `url(${slides[currentIndex]})` }}
            ></div>
            <div className={"absolute bottom-4 flex justify-center items-center w-[100%]"}>
                <div className="flex gap-1 justify-center">
                    {slides.length > 1 && slides.map((slide, slideIndex) => (
                        <div
                            className="cursor-pointer"
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                        >
                            {
                                slide === slides[currentIndex] ? (
                                    <img src="/images/stick.svg" alt="" className={"w-[20px]"}/>
                                ) : (
                                    <img src="/images/sliderEllipse.svg" alt="" className={"w-[10px] h-[10px]"}/>
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Slider;
