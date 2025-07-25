"""add collections

Revision ID: ee8099abd5f2
Revises: fa069f77f4ea
Create Date: 2023-06-28 14:47:16.097811

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee8099abd5f2'
down_revision = 'fa069f77f4ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('collection',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uuid', sa.String(length=22), nullable=False),
    sa.Column('privacy', sa.Enum('public', 'onlyreg', 'private', name='levelprivacy'), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['collection.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('uuid')
    )
    with op.batch_alter_table('composition', schema=None) as batch_op:
        batch_op.add_column(sa.Column('collection_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'collection', ['collection_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('composition', schema=None) as batch_op:
        inspector = sa.inspect(batch_op.get_bind())
        constraints = inspector.get_foreign_keys('composition')
        for constraint in constraints:            
            batch_op.drop_constraint(constraint['name'], type_='foreignkey'    
        )
        batch_op.drop_column('collection_id')

    op.drop_table('collection')
    # ### end Alembic commands ###
