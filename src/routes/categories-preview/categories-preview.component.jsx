import {useContext, Fragment} from "react";
import {CategoriesContext} from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    return <CategoryPreview products={categoriesMap[title]} title={title} key={title} />
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;
