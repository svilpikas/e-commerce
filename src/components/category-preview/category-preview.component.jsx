import ProductCard from "../product-card/product-card.component";
import {CategoryPreviewContainer, CategoryPreviewItem, CategoryTitle} from "./category-preview.styles";

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryTitle to={`${title}`}>{title.toUpperCase()}</CategoryTitle>
            </h2>
            <CategoryPreviewItem>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </CategoryPreviewItem>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;
