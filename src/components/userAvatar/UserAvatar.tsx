import styled from "styled-components"

const StyledUserAvatar = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-full);
`


export const UserAvatar = () => {
    {/* Upload image in webp and replace url  */}
    return (<StyledUserAvatar src="https://s3-alpha-sig.figma.com/img/d6ff/6631/66716c3c3d107981e2c201c0a1f0b156?Expires=1698624000&Signature=OiKdtJdhjh1o3tFuVTbOe128-SmHzbwrCHqOYfwCcnHq2A035QQKCHV~7~0SuXJu96et9oe3CI4gtmWU~i97CQtO1Z4upnRNwY-r5T7XugDwfPU6Q72RWk52xrVJXY97cN0H1TJ4FO46MbDkkWIlSRb4zrnRtGBOxwVh512Kl~UniA8G9kA7ckOvjyxn74YRNycJ3qVa~Q70osXiahtBepetARjq9b5rNYRKQOFI5RzaU9uilKLRWqqbRSy8f1no8MVUFLrf00q3Y9L6fRs8r8kfje4xfK6bvtzIwL0LLHtEkoFU~Vh9k9nDbZigTvGLql54DEpeIgTvoqp0nOC0CQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="User avatar" />)
}