'use client'

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps{
    isOpen:boolean
    onClose:()=>void
    src:string | null
}

function ImageModal({isOpen, onClose, src}:ImageModalProps) {
    if(!src){
        return null
    }
    return ( <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-80 h-80">
            <Image alt="image" src={src} fill className="object-cover" />
        </div>
    </Modal> );
}

export default ImageModal;