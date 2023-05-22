import {redirect} from "react-router-dom";
import {BackgroundImage, CategoryBodyContainer, CategoryItemContainer} from "./category-item.styles";

const CategoryItem = ({category}) => {
    const {imageUrl, title, route} = category;
    const redirectToCategory = () => {
        redirect(`/${route}`)
    }

    return (
        <CategoryItemContainer>
            <BackgroundImage
                 style={{backgroundImage: `url(${imageUrl})`}}/>
            <CategoryBodyContainer onClick={redirectToCategory}>
                <h2>{title}</h2>
                <p>shop now</p>
            </CategoryBodyContainer>
        </CategoryItemContainer>)
}

export default CategoryItem;
