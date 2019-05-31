import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ProductPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featuredimage,
  price,
  link
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <p className="subtitle">₩&nbsp;{price}</p>
            <div className="image-box" style={{
              maxWidth: '400px'

            }}>
              <PreviewCompatibleImage
                        imageInfo={{
                          image: featuredimage,
                          alt: `featured image thumbnail for post ${
                            title
                          }`,
                        }}
              />
            </div>
            <PostContent content={content} />
            <br />
            <a className="button is-link" href={link} target="_blank" rel='noreferrer noopener'> 구매하기 </a>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>태그</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link className="tag is-link" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ProductPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  featuredimage: PropTypes.string,
  price: PropTypes.number,
  link: PropTypes.string
}

const ProductPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProductPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Product">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        featuredimage={post.frontmatter.featuredimage}
        price={post.frontmatter.price}
        link={post.frontmatter.link}
      />
    </Layout>
  )
}

ProductPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProductPost

export const pageQuery = graphql`
  query ProductPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        price
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 400, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        link
        tags
      }
    }
  }
`
