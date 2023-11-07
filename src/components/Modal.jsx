export default function Modal({ setModal, modal, children, title }) {

    function handleExit() {
        setModal(false);
    }

    return (
        <>
            {modal ? <div className="rounded-xl top-[20%] right-[40%] bg-white shadow-xl absolute z-10 p-3 space-y-3">
                <div className="flex items-center justify-between" >
                    <h2 className="font-medium">{title}</h2>
                    <button onClick={handleExit} className="text-red-600 font-bold text-xl">X</button>
                </div>
                <div className="flex flex-col gap-y-4 items-center">
                    {children}
                </div>
            </div > : null}
        </>
    )
}