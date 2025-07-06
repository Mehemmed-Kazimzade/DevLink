import { motion } from "motion/react";

interface MotionDivWrapperProps {
    children: React.ReactNode,
}

export default function MotionDivWrapper( { children }: MotionDivWrapperProps ) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}