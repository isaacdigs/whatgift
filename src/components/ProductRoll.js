import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ProductRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts && 
          posts.map(({ node: post }) => (
          <div className="is-parent tile column is-4" key={post.id}>
            <article
              className={`blog-list-item tile is-child box articlebox ${
                post.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
            >
              <header>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail image">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${
                          post.title
                        }`,
                      }}
                    />
                  </div>
                ) : null}

              </header>
              <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4 has-text-centered is-block"
                    to={post.fields.slug}
                  >
                    {post.frontmatter.title}
                  </Link>
              </p>
              <p>
                {post.excerpt}
              </p>
              <footer className="price-buttons">
                <span className="subtitle is-size-5 price-tag">
                      {post.frontmatter.price ? '₩' + post.frontmatter.price : null}
                </span>
                <span className="button-group">
                  <Link className="button" to={post.fields.slug}>
                    정보
                  </Link>
                  <a className="button is-link" href={post.frontmatter.link} target="_blank" rel="noopener noreferrer">
                    구매
                  </a>
                </span>
              </footer>
            </article>
          </div>
        ))}

      </div>
    )
  }
}

ProductRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ProductRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "product-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 100)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                link
                price
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }

      }
    `
  }
  render={(data, count) => <ProductRoll data={data} count={count} />}
  />
)
