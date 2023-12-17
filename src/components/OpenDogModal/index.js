import React from "react";
import { useModal } from "../../context/Modal";

export default function OpenDogModal({
    modalComponent, // component to render inside the modal
    dogInfo, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    //   return <button onClick={onClick}>{buttonText}</button>;
    return (
        <div className="dog-img-container" onClick={onClick}>
            <img src={dogInfo.img} alt="dog info"></img>
        </div>
    )
}
