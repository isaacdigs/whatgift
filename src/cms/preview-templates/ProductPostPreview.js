import React from 'react'
import PropTypes from 'prop-types'
import { ProductPostTemplate } from '../../templates/product-post'

const ProductPostPreview = ({ entry, widgetFor }) => (
  <ProductPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    featuredimage={entry.getIn(['data', 'featuredimage'])}
    price={entry.getIn(['data', 'price'])}
    link={entry.getIn(['data', 'link'])}
  />
)

ProductPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ProductPostPreview
