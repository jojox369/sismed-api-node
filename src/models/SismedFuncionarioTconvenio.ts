import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedFuncionario from './SismedFuncionario';
import SismedTipoConvenio from './SismedTipoConvenio';

@Entity('sismed_funcionario_tconvenio', { schema: 'macmassc_sismed' })
export default class SismedFuncionarioTconvenio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'funcionario_id' })
  funcionarioId: number;

  @Column('int', { name: 'tipo_convenio_id' })
  tipoConvenioId: number;

  @ManyToOne(
    () => SismedFuncionario,
    (sismedFuncionario) => sismedFuncionario.funcionarioTconvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: SismedFuncionario;

  @ManyToOne(
    () => SismedTipoConvenio,
    (sismedTipoConvenio) => sismedTipoConvenio.sismedFuncionarioTconvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: SismedTipoConvenio;
}