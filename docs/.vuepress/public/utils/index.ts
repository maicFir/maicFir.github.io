
export const isMobile = () => {
    let isMobile = false;
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile)/i)) {
        isMobile = true;
    }
    return isMobile
}